async function loadComponent(id,url){

    const response = await fetch(url)

    const html = await response.text()

    document.getElementById(id).innerHTML = html
}

loadComponent("nav","components/nav.html")
loadComponent("footer","components/footer.html")