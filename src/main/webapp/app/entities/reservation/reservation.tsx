import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './reservation.reducer';

export const Reservation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [etatFilter, setEtatFilter] = useState('');

  const dispatch = useAppDispatch();
  const [clientNoms, setClientNoms] = useState({});
  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const reservationList = useAppSelector(state => state.reservation.entities);
  const loading = useAppSelector(state => state.reservation.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,

        search: searchTerm,
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
    const fetchClientNames = async () => {
      await Promise.all(
        reservationList.map(async reservation => {
          const clientNomResponse = await fetch(`/api/reservations/${reservation.id}/client-nom`);

          const clientNom = await clientNomResponse.text();

          setClientNoms(prevState => ({ ...prevState, [reservation.id]: clientNom }));
        }),
      );
    };

    fetchClientNames();
  }, [reservationList]);
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

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  const filteredReservationList = reservationList.filter(reservation => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reservation.date.toLowerCase().includes(searchLower) ||
      reservation.etat.toLowerCase().includes(searchLower) ||
      clientNoms[reservation.id].toLowerCase().includes(searchLower)
    );
  });

  return (
    <div>
      <h2 id="reservation-heading" data-cy="ReservationHeading">
        <Translate contentKey="appApp.reservation.home.title">Reservations</Translate>
        <div className="me-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="form-control form-control-sm"
          />
        </div>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="appApp.reservation.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/reservation/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="appApp.reservation.home.createLabel">Create new Reservation</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {filteredReservationList && filteredReservationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('date')}>
                  <Translate contentKey="appApp.reservation.date">Date</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('date')} />
                </th>
                <th className="hand" onClick={sort('etat')}>
                  <Translate contentKey="appApp.reservation.etat">Etat</Translate> <FontAwesomeIcon icon={getSortIconByFieldName('etat')} />
                </th>
                <th>
                  <Translate contentKey="appApp.reservation.nomClient">Cient</Translate>
                </th>

                <th />
              </tr>
            </thead>
            <tbody>
              {filteredReservationList.map((reservation, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{reservation.date ? <TextFormat type="date" value={reservation.date} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{reservation.etat}</td>
                  <td>{clientNoms[reservation.id]}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/reservation/${reservation.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/reservation/${reservation.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/reservation/${reservation.id}/delete`)}
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
              <Translate contentKey="appApp.reservation.home.notFound">No Reservations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Reservation;
