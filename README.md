GOT C TAKIMI CINEMANIA PROJESİ

Öncelikle herkese güzel bir hafta diliyorum. İnşallah çok verimli çalışarak
güzel bir proje çıkaracağız. Proje hazırlık aşamasında yaptığımız değişiklikleri
aşağıda belirtiyorum. Dikkat etmeniz gereken konular. Genel olarak geçen projede
uyguladığımız ama unutabileceğiniz konuları, aklıma gelenleri aşağıya
hazırladık. Umarım güzel bir rehber olur sizlere.

Projenin Local Bilgisayara İndirilmesi ve Yüklenmesi.

git clone https://github.com/GO-IT-C-TAKIMI/cinemania.git

cd cinemania

npm i npm install

---

Dikkat edeceğimiz ilk nokta kesinlikle main branchine push yapmıyoruz.
development branchi oluşturuldu. Kendinize bir branch açarak yaptığınız
değişiklikleri development branchine push etmenizi rica ediyoruz.

# Proje Adı

Cinemania

## Proje Yapısı

Proje, aşağıdaki branch yapısını kullanmaktadır:

- **development**: Tüm ekip üyelerinin değişikliklerini birleştirdiği ana
  branch.
- **feature/[özellik-adı]**: Her ekip üyesinin geliştirdiği özellikler için
  oluşturduğu branch'ler.

## Branch Oluşturma

Ekip üyeleri, kendi branch'lerini oluşturmak için aşağıdaki adımları
izlemelidir:

1. **Development Branch'ine Geçiş Yapın**

git checkout development

git pull origin development

2. Yeni Branch Oluşturun Kendi branch'inizi oluşturun (özellik adı ile
   değiştirin):

git checkout -b feature/özellik-adı

## Branch Oluşturma

1. Yapmış olduğunuz değişiklikleri development branch'ine göndermeden önce
   aşağıdaki adımları izleyin:

Değişiklikleri Staging Alanına Ekleyin

git add .

2. Commit Mesajınızı Yazın Commit mesajınızı anlamlı bir şekilde yazın:

git commit -m "Özellik: [özellik-adı] - Değişiklik açıklaması"

Güncel Development Branch’ini Alın Değişikliklerinizi development branch'i ile
birleştirmek için önce en son güncellemeleri alın:

git checkout development git pull origin development

3. Feature Branch’inizi Yeniden Temellendirin

git checkout feature/özellik-adı git rebase development

4. Değişikliklerinizi Puslayın

git checkout development git merge feature/özellik-adı git push origin
development

**\*\***\***\*\*** PROJE ÖZELLİKLERİ **\*\***\*\*\***\*\***

css klasörü altında reset.css ve style.css oluşturularak genel tanımlamalar
bunun üzerinde yapıldı.

\*\* styless.css --brend-color: #f87719; --brend-color-rgba: #f87719cc;
--brend-color-active: #188ce8; --main-background: #111; --main-background-rgba:
#11111180; --btn-background: linear-gradient(141.22deg, #ffc226 9.4%, #f84119
91.91%); --star-background: linear-gradient(141.22deg, #f84119 9.4%, #f89f19ad
91.91%); --card-background: linear-gradient(180deg, #0000 63.48%, #000000e6
92.16%); --hero-background: linear-gradient(87.8deg, #0e0e0e 15.61%, #0e0e0e00
60.39%), #0e0e0e; --main-text-color: #fff; --second-text-color: #f8f8f8;
--grey-text-color: #111; --main-gray-color: #595959; --main-white-color: #fff;
--main-black-color: #000; --hero-background-color: #2f303a; --modal-keys-color:
#b7b7b7; --btn-border-radius: 7.4rem; --icons-border-radius: 50%;
--cards-border-radius: 0.5rem; --modal-border-radius: 2rem; --cards-box-shadow:
1px 1px 24px 2px #01010173; --modal-box-shadow: 1px 1px 14px 4px #ff6b086b;
--cubic: cubic-bezier(0.4, 0, 0.2, 1);

bu alandan bakarak kullanmak istediğiniz renk özelliğini aşağıdaki şekilde
uygulayabilirsiniz.

**ÖRNEK** background-color: var(--brend-color); color:var(--main-gray-color);

vs.

Projede kök pixel büyüklüğü kolaylık olması için 10px olarak tanımlandı. Projede
yazacağınız css kodları için figmadan baktığınız pixel büyüklüğünü 10 a bölüp
rem şeklinde yazmanız yeterlidir.

**ÖRNEK**

font-size:1.5rem; /_ 15px için _/

---

**\***ÇOK ÖNEMLİ**\*** projeyi hazırlarken min-width yaklaşımı ile yazacağız
genel kod düzeninin sağlanması için her herkesin buna dikkat etmesini rica
edeceğiz Çünkü proje yaklaşımı açısından ileride sorun yaşayabilirsiniz.
min-width yaklaşımda her zaman win-width değeri en düşük olan alandan
başlarsınız. ilk başta mobil sonra tablet enson desktop olacak.

min-width yaklaşımda her zaman en yukarda mobil ortada tablet en altta desktop
kodları olmalı. örneği styles.css dosyasında var ben yine bir örnek bırakıyorum.

.container { margin-left: auto; margin-right: auto; padding-left: 0.2rem;
padding-right: 0.2rem; }

@media (min-width: 768px) { .container { width: 76.8rem; padding-left: 3.2rem;
padding-right: 3.2rem; } }

@media (min-width: 1280px) { .container { width: 128rem; } }

tablet 768px , desktop 1280px olacak.

Sorun yaşamamınız için öneri olarak 3 adet css oluşturarak mobil.css tablet.css
ve desktop.css olarak dosyalarınızı saklamanız olacaktır.

CSS dosyalarınızı yazarken Mobili detaylı yazdıktan sonra. tablette ve desktopta
sırasıyla sadece ezmeniz yani değiştirmeniz gereken alanları yazmanız
yeterlidir. tekrar tekrar aynı kodları kopyalamanıza gerek yok. en alttaki yani
en son okunan kod her zaman üsttekini ezecektir.

GENEL BUTON ÖZELLİKLERİ EKLENDİ

Projede genel kullanılacak buton özellikleri styless css içerisine tanımlandı.
buton tasarımları yapıldı tekrar yapmanıza gerek yok. butonu css olmadan dahi
ekleseniz efektleri dahil çıkacatır. sadece boyutunu ayarlamanız yeterli.

**\*** DOSYA YAPISI **\***

Her bölümün ayrı bir yapısı olacak. partials alanında mevcut Sectionların
klasörleri ve dosyaları ile birlikte css dosyaları olacak. bunun yanında genel
olarak herkesin kullanacağı özellikleri components içerisine koyduğunuzda farklı
sayfalarda o özelliği import edebiliriz. kök klasörde components klasörü
oluşturuldu.

\***_ SON OLARAK_**

Umarım güzel bir hafta geçirerek iyi bir proje ortaya çıkarırız. projemiz şu
anda canlıya alındı.

https://go-it-c-takimi.github.io/cinemania/

linkten ulaşabilirsiniz.
