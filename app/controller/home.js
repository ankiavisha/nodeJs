import {Image} from '../models/images';
export const home = (req, res) => {

	if(req.user) {
		Image.find({},(err,data)=>{
			
			res.render('pages/home',{
            images : data,
            user : req.user
        });
		});
	}
}