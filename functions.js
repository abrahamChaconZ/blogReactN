

export const filterTitle = (buscando, blogEntries, setEntries, getAllBlogEntries) => {
    if (buscando === "") {
        getAllBlogEntries()
    }

    const newRes = blogEntries?.filter((ent) => buscando === ent.title)
    console.log(newRes)
    if (!newRes) {
        Alert.alert("No hay resultados aún.");

    } else {
        setEntries(newRes)
    }

}

export const filterAutor = (buscando, blogEntries, setEntries, getAllBlogEntries) => {
    if (buscando === "") {
        getAllBlogEntries()
    }
    const newRes = blogEntries?.filter((ent) => buscando === ent.autor)
    setEntries(newRes)
}

export const filterContent = (buscando, blogEntries, setEntries, getAllBlogEntries) => {
    if (buscando === "") {
        getAllBlogEntries()
    }
    const newRes = blogEntries?.filter((ent) => ent.contenido.includes(buscando))
    setEntries(newRes)
}