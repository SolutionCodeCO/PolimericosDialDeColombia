let principal = document.getElementById('imgTrabajo')

fotoTrabajo = new Array()

fotoTrabajo[0] = ['/img/Recursos polimericos/1.webp'],
fotoTrabajo[1] = ['/img/Recursos polimericos/2.webp'],
fotoTrabajo[2] = ['/img/Recursos polimericos/3.webp'],
fotoTrabajo[3] = ['/img/Recursos polimericos/4.webp'],
fotoTrabajo[4] = ['/img/Recursos polimericos/5.webp'],
fotoTrabajo[5] = ['/img/Recursos polimericos/6.webp'],
fotoTrabajo[6] = ['/img/Recursos polimericos/7.webp'],
fotoTrabajo[7] = ['/img/Recursos polimericos/8.webp'],
fotoTrabajo[8] = ['/img/Recursos polimericos/9.webp'],
fotoTrabajo[9] = ['/img/Recursos polimericos/10.webp'],
fotoTrabajo[10] = ['/img/Recursos polimericos/11.webp'],
fotoTrabajo[11] = ['/img/Recursos polimericos/12.webp'],
fotoTrabajo[12] = ['/img/Recursos polimericos/13.webp'],
fotoTrabajo[13] = ['/img/Recursos polimericos/14.webp'],
fotoTrabajo[14] = ['/img/Recursos polimericos/15.webp'],
fotoTrabajo[15] = ['/img/Recursos polimericos/16.webp'],
fotoTrabajo[16] = ['/img/Recursos polimericos/17.webp'],
fotoTrabajo[17] = ['/img/Recursos polimericos/18.webp'],
fotoTrabajo[18] = ['/img/Recursos polimericos/19.webp'],
fotoTrabajo[19] = ['/img/Recursos polimericos/20.webp']

if (principal) {
    for (i = 0; i < fotoTrabajo.length; i++) {
        let crearSlide = document.createElement('div');
        let crearImg = document.createElement('img');

        crearSlide.setAttribute('class', 'slide');
        // Agrega la imagen al slide
        crearImg.setAttribute('src', fotoTrabajo[i][0]);
        crearSlide.appendChild(crearImg); // Añade la imagen al div del slide
        crearImg.setAttribute('class', 'imagen-creada');
        crearImg.setAttribute('alt', 'img representativa');


        principal.appendChild(crearSlide);
    }
}

