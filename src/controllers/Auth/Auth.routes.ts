import { Router } from 'express';
import AuthController from './Auth.controller';
import { IRouter } from '../../interfaces/Router.interface';
import validationMiddleware from '../../middlewares/DtoValidation.middleware';
import { RegisterDto, LoginDto, GoogleLoginDto, FacebookLoginDto } from './Auth.dto';

class AuthRoutes implements IRouter {
    public path: string;
    public router: Router = Router();
    
    constructor(path: string) {
        this.path = path;
        this.initializeRoutes(new AuthController());
    }

    private initializeRoutes(controller: AuthController) {
        this.router.post('/register', validationMiddleware(RegisterDto), controller.registerUser);
        this.router.post('/login', validationMiddleware(LoginDto), controller.loginUser);
        this.router.post('/google', validationMiddleware(GoogleLoginDto), controller.googleLogin);
        this.router.post('/facebook', validationMiddleware(FacebookLoginDto), controller.facebookLogin);
    }

}

export default AuthRoutes;