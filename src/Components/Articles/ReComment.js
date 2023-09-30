import { atom } from "recoil";
import { useLayoutEffect } from "react";

export const freeReComment = atom
    (
        {
            key: "freeReComment",
            default: "",
        }

    )