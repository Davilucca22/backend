import { DeletaS3 } from "../middlewares/BDimagens.js";
import User from "../models/UserModel.js";

export const DeletaFoto = async (req, res) => {
    try {
        const { IDpost } = req.body;

        const users = await User.find(
            { "posts._id": IDpost }, // busca o obj a partir do id do post
            { posts: 1 } // retorna um array apenas com os posts
        );

        for (const user of users) {
            const postIndex = user.posts.findIndex(post => post._id.toString() === IDpost);
            if (postIndex !== -1) {
                const post = user.posts[postIndex];
                await DeletaS3(post.imgURL);
                user.posts.splice(postIndex, 1);
                await user.save(); //atualiza o banco de dados do usuário após deletar a foto
            }
        }

        res.json({ msg: "Foto deletada com sucesso" });
    } catch (e) {
        res.status(500).json(e);
    }
}
