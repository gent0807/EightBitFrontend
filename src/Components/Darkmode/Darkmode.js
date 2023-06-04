import { atom } from "recoil";
import { useLayoutEffect } from "react";

export const isDark = atom
(
    {
        key: "isDark",
        default: localStorage.getItem("mode") === "false" ? true : false,
    }
)