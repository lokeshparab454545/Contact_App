import { useState } from 'react'

const useDisclose = () => {
    const [open, setOpen] = useState(false);

    const isOpen = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return { isOpen, open, onClose };
}

export default useDisclose
