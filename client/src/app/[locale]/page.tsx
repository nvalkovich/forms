'use client'

import { useEffect } from "react";
import { useNavigation, Routes } from "@/hooks/useNavigation";

export default function HomePage() {
    const {navigate} = useNavigation();

    useEffect(() => {
        navigate(Routes.templates);
    })

    return null;
}
