import { atom } from "recoil";
import { useLayoutEffect } from "react";

export const freeReply = atom
    (
        {
            key: "freeReply",
            default: "",
        }

    )
