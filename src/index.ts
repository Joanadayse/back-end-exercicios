import express, { Request, Response } from 'express';
import cors from 'cors';
import { TVideosDB } from './types';
import { Videos } from './moldes/Videos';
import { VideosDataBase } from './database/VideosDataBase';

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/videos",async (req:Request , res: Response)=>{

    try{
     const q= req.query.q as string;

    const videosDB= await new VideosDataBase().findVideos(q);

    const videos: Videos[]= videosDB.map((video)=>{
        return new Videos(
            video.id,
            video.titulo,
            video.duracao,
            video.create_at
        )
    })

    res.status(200).send(videos);

    }catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }
})

app.post("/videos" , async( req: Request, res:Response)=>{
    try{

        const {id,title,duracao}=req.body;
    

if(id !== undefined){
    if(typeof id !== "string"){
        res.status(400);
        throw new Error("'id' precisa ser um number")
    }
}

if (title !== undefined){
    if(typeof title !== "string"){
        res.status(400);
        throw new Error("'titulo' precisa ser string")
    }

    if(title.length < 3){
        res.status(400);
        throw new Error("'titulo' deve ser mais que 3 caracteres")
    }
}


if(duracao !== undefined){
    if(typeof duracao !== "number"){
        res.status(400);
        throw new Error("'descrição' precisa ser number")
    }

    if(duracao < 0){
        res.status(400);
        throw new Error("'duração' deve ser maior que 0")
    }

}

// const [videosDB] : TVideosDB[] | undefined[]= await db("videos").where({id});
const videosDB: TVideosDB | undefined=await new VideosDataBase().findVideosById(id)
if (videosDB){
   res.status(404);
   throw new Error("'id' não encontrado");
} 

const newVideo= new Videos(
    id,
    title,
    duracao,
    new Date().toISOString()
)

const newVideoDB: TVideosDB={
    id: newVideo.getId(),
    titulo: newVideo.getTitulo(),
    duracao: newVideo.getDuracao(),
    create_at: newVideo.getCreateAt()
}

// await db("videos").insert(newVideoDB);
await new VideosDataBase().insertVideo(newVideoDB);

// const [userDB]:TVideosDB[]= await db("videos").where({id})
res.status(201).send({message:"video criado com sucesso", info: newVideoDB})

   }catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }
})

app.put("/videos/:id",async (req:Request, res: Response)=>{
    try{
        const id=req.params.id;
        const {titulo,duracao}= req.body;

        if(typeof id !== "string"){
            res.status(404);
            throw new Error("'id' deve ser string");
        }

        if (titulo && typeof titulo !== "string") {
            res.status(400);
            throw new Error("'titulo' inválido, deve ser string");
          }
      
    
    
          if (duracao && typeof duracao !== "number") {
            res.status(400);
            throw new Error("'duracao' inválido, deve ser um number");
          }

        // const [videosDB]: TVideosDB[] | undefined = await db("videos").where({id});

        const videosDB = await new VideosDataBase().findVideosById(id);

        if(!videosDB){
            res.status(404);
            throw new Error("'id' não existe");
        }

        const updateVideo={
            id:videosDB.id,
            titulo: titulo || videosDB.titulo,
            duracao: duracao ||   videosDB.duracao,
            create_at: videosDB.create_at
        };
        // await db("videos").where({id}).update(updateVideo);


        const updateVideos= new Videos(
            updateVideo.id,
            updateVideo.titulo,
            updateVideo.duracao,
            updateVideo.create_at
        );

        await new VideosDataBase().updateVideo(updateVideo,id)
      

        res.status(200).send({message:"video atualizado com sucesso!", info: updateVideos});

    }catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }

});

app.delete("/videos/:id",async (req:Request , res:Response)=>{
    try{

        const id= req.params.id;
        if(typeof id !== "string"){
            res.status(404);
            throw new Error("'id' precisa ser string");
        };
        // const [videosDB]: TVideosDB[] | undefined = await db("videos").where({id});

        const videosDB= await new VideosDataBase().findVideosById(id)
      if(!videosDB){
        res.status(404);
        throw new Error("id não existe");
      }

    //   const videoToDelete= new Videos(
    //     videosDB.id,
    //     videosDB.titulo,
    //     videosDB.duracao,
    //     videosDB.create_at
    //   );

    //   await db("videos").where({id:videoToDelete.getId()}).del();

    await new VideosDataBase().deleteVideos(id)
      res.status(201).send("video deletado com sucesso!")


    }catch(error){
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }

    }
})