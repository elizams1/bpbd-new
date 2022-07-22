# CARA DEPLOY REACT.JS KE HOSTING

## Siapkan React App
Sebelum men-deploy persiapkan terlebih dahulu aplikasi  yang akan di hosting

## Akses SSH via Terminal
Selanjutnya mengakses server via SSH menggunakan terminal dengan perintah `ssh username@controlpanelURL -p 64000` sesuaikan dengan server yang akan digunakan.

## Melakukan git clone pada folder /var/www/html/
Melakukan git clone dengan url github repository yang berisi aplikasi react pada folder /var/www/html/ 
- Step 1 : `cd /var/www/html/`
- Step 2 : `sudo git clone URL-git-repo`

## Masuk ke folder repo yang telah di clone untuk build
Selanjutnya masuk ke folder yang berisi aplikasi react untuk melakukan build dengan langkah langkah berikut :
- Step 1 : `cd nama-folder/`
- Step 2 : `sudo npm install`
- Step 3 : `sudo npm start`
- Step 4 : `sudo npm run build`
