import passport from 'passport';

export default class SessionsController {
  static async registerUser(req, res) {
    try {
      res.json({ status: 'success', message: 'Usuario Creado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el usuario: ' + error });
    }
  }

  static async loginUser(req, res) {
    passport.authenticate('login', async (err, user) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Error al iniciar sesión' });
      }

      if (!user) {
        return res.status(400).json({ status: 'error', message: 'Credenciales inválidas' });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ status: 'error', message: 'Error al iniciar sesión' });
        }
        return res.status(200).json({ status: 'success', payload: user });
      });
    })(req, res);
  }

  static async getCurrentUser(req, res) {
    const user = req.user;
    res.render('current', { user });
  }

  static async loginWithGithub(req, res, next) {
    passport.authenticate('github', { scope: ['user:email'] })(req, res, next);
  }

  static async loginWithGithubCallback(req, res) {
    passport.authenticate('github', async (err, user) => {
      if (err) {
        return res.status(500).json({ status: 'error', message: 'Error al autenticar con GitHub' });
      }

      if (!user) {
        return res.status(400).json({ status: 'error', message: 'Autenticación con GitHub fallida' });
      }

      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ status: 'error', message: 'Error al iniciar sesión' });
        }
        res.redirect('/products');
      });
    })(req, res);
  }

  static async logoutUser(req, res) {
    req.logout();
    res.json({ status: 'success', message: 'Sesión cerrada exitosamente.' });
  }
}
