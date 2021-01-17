export const mobileService = {
    handleTooltip
}

function handleTooltip(txt) {
    const isMobile = ((window.innerWidth <= 800) && (window.innerHeight <= 600))
    return isMobile ? undefined : txt
};

