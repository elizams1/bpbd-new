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

## Masuk ke projectnya
Setelah melakukan build, dapat masuk ke folder project `cd nama-folder/` 

##Menjalankan folder Build dengan PM2
selanjutnya menjalankan folder build dengan perintah `pm2 serve build/ nomor_port --name "sesuai dengan nama project" --spa` spa = single page aplication. Hal ini dilakukan untuk pm2 menjalankan build folder bpbd dengan port sekian. Nomor port disesuaikan dan pastikan berbeda.

## Melihat proyek yang berjalan
Menggunakan perintah `pm2 list` untuk mengetahui aplikasi atau proyek yang sedang berjalan

## Menghapus proyek yang berjalan
Menggunakan perintah `pm2 delete nama_project` untuk menghapus project yang sedang berjalan

## Membuat serve blok 
menggunakan perintah `cd /etc/nginx/conf.d/` untuk mengubah kode port menjadi domain

## Menjalankan server blok
- `sudo cp nama_server_blok nama_server_blok_baru` : perintahuntuk meng-copy server blok yang sudah ada menjadi sebuah server blok baru
- `sudo nano nama_server_blok` : perintah untuk membuat server blok baru secara manual
- `sudo mv nama_server_blok_lama nama_server_blok_baru` : perintah untuk mengganti nama server blok
- `sudo systemctl reload nginx` : untuk melakukan reload pada server blok
- `sudo systemctl restart nginx` : untuk melakukan restart pada server blok
