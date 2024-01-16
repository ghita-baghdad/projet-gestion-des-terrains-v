import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { openFile, byteSize, Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getEntities } from './terrain.reducer';
import MapComponent from './MapComponent';

export const Terrain = () => {
  const dispatch = useAppDispatch();
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [userLatitude, setUserLatitude] = useState<number | undefined>(null);
  const [userLongitude, setUserLongitude] = useState<number | undefined>(null);
  useEffect(() => {
    // Fetch user's location using the browser's geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setUserLatitude(position.coords.latitude);
          setUserLongitude(position.coords.longitude);
        },
        error => {
          console.error('Error getting user location:', error);
        },
      );
    }
  }, []);

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));
  const terrainList = useAppSelector(state => state.terrain.entities);
  const loading = useAppSelector(state => state.terrain.loading);

  const [selectedTerrain, setSelectedTerrain] = useState(null);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const openMap = terrain => {
    const { latitude, longitude } = terrain;
    const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;

    // Open Google Maps in a new window or tab
    window.open(googleMapsUrl, '_blank');
  };

  const closeMap = () => {
    setSelectedTerrain(null);
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="terrain-heading" data-cy="TerrainHeading">
        <Translate contentKey="appApp.terrain.home.title">Terrains</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appApp.terrain.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/terrain/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appApp.terrain.home.createLabel">Create new Terrain</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {terrainList && terrainList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('nomTerrain')}>
                  <Translate contentKey="appApp.terrain.nomTerrain">Nom Terrain</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('nomTerrain')} />
                </th>
                <th className="hand" onClick={sort('photo')}>
                  <Translate contentKey="appApp.terrain.photo">Photo</Translate>
                  <FontAwesomeIcon icon={getSortIconByFieldName('photo')} />
                </th>
                <th className="hand" onClick={sort('adresse')}>
                  <Translate contentKey="appApp.terrain.adresse">Adresse</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('adresse')} />
                </th>
                <th className="hand" onClick={sort('latitude')}>
                  <Translate contentKey="appApp.terrain.latitude">Latitude</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('latitude')} />
                </th>
                <th className="hand" onClick={sort('longitude')}>
                  <Translate contentKey="appApp.terrain.longitude">Longitude</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('longitude')} />
                </th>
                <th className="hand" onClick={sort('rank')}>
                  <Translate contentKey="appApp.terrain.rank">Rank</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('rank')} />
                </th>
                <th className="hand" onClick={sort('type')}>
                  <Translate contentKey="appApp.terrain.type">Type</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('type')} />
                </th>
                <th className="hand" onClick={sort('etat')}>
                  <Translate contentKey="appApp.terrain.etat">Etat</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('etat')} />
                </th>
                <th className="hand" onClick={sort('description')}>
                  <Translate contentKey="appApp.terrain.description">Description</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('description')} />
                </th>
                <th className="hand" onClick={sort('typeSal')}>
                  <Translate contentKey="appApp.terrain.typeSal">Type Sol</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('typeSal')} />
                </th>
                <th className="hand" onClick={sort('tarif')}>
                  <Translate contentKey="appApp.terrain.tarif">Tarif</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('tarif')} />
                </th>
                <th>
                  <Translate contentKey="appApp.terrain.nomClub"> Club</Translate>
                </th>
                <th>
                  <Translate contentKey="appApp.terrain.nomZone"> Zone</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {terrainList.map((terrain, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{terrain.nomTerrain}</td>
                  <td>
                    {terrain.photo ? (
                      <div>
                        {terrain.photoContentType ? (
                          <a onClick={openFile(terrain.photoContentType, terrain.photo)}>
                            <Translate contentKey="entity.action.open">Open</Translate>
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {terrain.photoContentType}, {byteSize(terrain.photo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    <Button color="primary" size="sm" onClick={() => openMap(terrain)} data-cy="openMapButton">
                      Open Map
                    </Button>
                  </td>
                  <td>{terrain.latitude}</td>
                  <td>{terrain.longitude}</td>
                  <td>{terrain.rank}</td>
                  <td>{terrain.type}</td>
                  <td>{terrain.etat}</td>
                  <td>{terrain.description}</td>
                  <td>{terrain.typeSal}</td>
                  <td>{terrain.tarif}</td>
                  <td>{terrain.nomClub ? <Link to={`/club/${terrain.nomClub.id}`}>Info Club</Link> : ''}</td>
                  <td>{terrain.nomZone ? <Link to={`/zone/${terrain.nomZone.id}`}>Info Terrain</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/terrain/${terrain.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/terrain/${terrain.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/terrain/${terrain.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="appApp.terrain.home.notFound">No Terrains found</Translate>
            </div>
          )
        )}
      </div>
      <div>
        {selectedTerrain && (
          <div className="map-container">
            <MapComponent
              latitude={selectedTerrain.latitude}
              longitude={selectedTerrain.longitude}
              userLatitude={userLatitude} // Pass the user's latitude
              userLongitude={userLongitude} // Pass the user's longitude
            />
            <Button color="secondary" onClick={closeMap} className="close-map-button">
              Close Map
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Terrain;
