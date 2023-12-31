import React, { useLayoutEffect } from 'react';
import { Translate } from 'react-jhipster';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { logout } from 'app/shared/reducers/authentication';

// Définition du composant LogoutSuccessMessage en dehors du composant Logout
const LogoutSuccessMessage = () => {
  return (
    <div className="p-5">
      <h4>
        <Translate contentKey="global.logout.success">Déconnexion réussie !</Translate>
        <br />
        <small>
          <Translate contentKey="global.logout.alternativeMessage">Merci d'avoir utilisé nos services. À la prochaine !</Translate>
        </small>
      </h4>
    </div>
  );
};

const Logout = () => {
  const logoutUrl = useAppSelector(state => state.authentication.logoutUrl);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(logout());
    if (logoutUrl) {
      window.location.href = logoutUrl;
    }
  }, [dispatch, logoutUrl]); // Ajout des dépendances pour éviter les avertissements

  // Rendu du composant Logout avec le composant LogoutSuccessMessage
  return <LogoutSuccessMessage />;
};

export default Logout;
