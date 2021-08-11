import { IAv_Date } from "@functions/av_date/av_date.interface";

export interface IAv_Time{
    id?: number;
    start: Date;
    end: Date;
    av_date_id?: number;
    av_Date?: IAv_Date;
}