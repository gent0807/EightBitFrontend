import { atom } from "recoil";
import { useLayoutEffect } from "react";

export const toggle = atom
    (
        {
            key: "toggle",
            default: true,
        }

    )

