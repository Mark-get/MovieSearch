import {Skeleton} from "@mui/material";

export const MovieCardSkeleton = () => (
    <article aria-hidden="true">
        <Skeleton variant="rounded" sx={{width: "100%", aspectRatio: "2 / 3"}}/>
        <Skeleton width="80%" sx={{margin: "8px auto 0"}}/>
    </article>
);
