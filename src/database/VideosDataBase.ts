import { TVideosDB } from "../types";
import { BaseDataBase } from "./BaseDataBase";

export class VideosDataBase extends BaseDataBase{
       public static TABLE_VIDEOS="videos";

    public async findVideos(q:string | undefined){
        let videosDB;

        if(q){
           const result: TVideosDB[]= await BaseDataBase.connection(VideosDataBase.TABLE_VIDEOS).where("title","LIKE",`%${q}%`);
          videosDB=result;
       }else{
           const result:TVideosDB[]= await BaseDataBase.connection(VideosDataBase.TABLE_VIDEOS);
           videosDB=result
       }

       return videosDB;

    }

    public async findVideosById(id:string){
        const [videosDB] : TVideosDB[] | undefined[]= await BaseDataBase.connection(VideosDataBase.TABLE_VIDEOS).where({id});
        return videosDB
    }

    public async insertVideo(newVideo:TVideosDB){
        await BaseDataBase.connection(VideosDataBase.TABLE_VIDEOS).insert(newVideo);
    }

    public async updateVideo(updateVideo:TVideosDB, id:string){
        await BaseDataBase.connection(VideosDataBase.TABLE_VIDEOS).where({id}).update(updateVideo);

    }

    public async deleteVideos(id: string){
        await BaseDataBase.connection(VideosDataBase.TABLE_VIDEOS).where({id}).del();
    }






}