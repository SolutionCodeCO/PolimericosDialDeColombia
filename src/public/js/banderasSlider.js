let principal2 = document.getElementById('imgBanderas')

fotoBandera = new Array()

fotoBandera[0] = ['/img/banderas/bandera-co.webp'],
fotoBandera[1] = ['/img/banderas/bolivia.webp'],
fotoBandera[2] = ['/img/banderas/chile.webp'],
fotoBandera[3] = ['/img/banderas/costa-rica.webp'],
fotoBandera[4] = ['/img/banderas/ecuador.webp'],
fotoBandera[5] = ['/img/banderas/honduras.webp'],
fotoBandera[6] = ['/img/banderas/mexico.webp'],
fotoBandera[7] = ['/img/banderas/peru.webp'],
fotoBandera[8] = ['/img/banderas/salvador.webp'],
fotoBandera[9] = ['/img/banderas/venezuela.webp'],
fotoBandera[10] = ['/img/banderas/bandera-co.webp'],
fotoBandera[11] = ['/img/banderas/bolivia.webp'],
fotoBandera[12] = ['/img/banderas/chile.webp'],
fotoBandera[13] = ['/img/banderas/costa-rica.webp'],
fotoBandera[14] = ['/img/banderas/ecuador.webp'],
fotoBandera[15] = ['/img/banderas/honduras.webp'],
fotoBandera[16] = ['/img/banderas/mexico.webp'],
fotoBandera[17] = ['/img/banderas/peru.webp'],
fotoBandera[18] = ['/img/banderas/salvador.webp'],
fotoBandera[19] = ['/img/banderas/venezuela.webp']

if (principal2) {
    for (i = 0; i < fotoBandera.length; i++) {
        let crearSlideBandera = document.createElement('div');
        let crearImgBandera = document.createElement('img');

        crearSlideBandera.setAttribute('class', 'slide');
        // Agrega la imagen al slide
        crearImgBandera.setAttribute('src', fotoBandera[i][0]);
        crearSlideBandera.appendChild(crearImgBandera); // Añade la imagen al div del slide
        crearImgBandera.setAttribute('class', 'imagen-creada2');
        crearImgBandera.setAttribute('alt', 'Pais aliado');


        principal2.appendChild(crearSlideBandera);
    }
}

