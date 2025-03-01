(async () => {
    //@ts-expect-error
    const versions = await window.versions.ping();
    console.log(versions);
})();
