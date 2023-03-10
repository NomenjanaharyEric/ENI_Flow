import { Controller, Get, Request, UseGuards} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@Controller('profile')
export class ProfileController {

    @UseGuards(JwtGuard)
    @Get()
    getProfile(@Request() req: any){
        return req.user;
    }
}
