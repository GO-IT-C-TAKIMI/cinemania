# GOT C Takımı Cinemania Projesi

Öncelikle herkese güzel bir hafta diliyorum. İnşallah çok verimli çalışarak
güzel bir proje çıkaracağız. Proje hazırlık aşamasında yaptığımız değişiklikleri
aşağıda belirtiyorum. Dikkat etmeniz gereken konular, genel olarak geçen projede
uyguladığımız ama unutabileceğiniz konuları derledim. Umarım güzel bir rehber
olur sizlere.

## Projenin Local Bilgisayara İndirilmesi ve Yüklenmesi

```bash
git clone https://github.com/GO-IT-C-TAKIMI/cinemania.git
cd cinemania
npm install
```

---

### Dikkat Edilecek Noktalar

- **Main branch'ine push yapmıyoruz.** Development branch'i oluşturuldu.
  Kendinize bir branch açarak yaptığınız değişiklikleri development branch'ine
  push etmenizi rica ediyoruz.

## Proje Adı

**Cinemania**

### Proje Yapısı

Proje, aşağıdaki branch yapısını kullanmaktadır:

- **development**: Tüm ekip üyelerinin değişikliklerini birleştirdiği ana
  branch.
- **feature/[özellik-adı]**: Her ekip üyesinin geliştirdiği özellikler için
  oluşturduğu branch'ler.

### Branch Oluşturma

Ekip üyeleri, kendi branch'lerini oluşturmak için aşağıdaki adımları
izlemelidir:

1. **Development Branch'ine Geçiş Yapın**

   ```bash
   git checkout development
   git pull origin development
   ```

2. **Yeni Branch Oluşturun**

   Kendi branch'inizi oluşturun (özellik adı ile değiştirin):

   ```bash
   git checkout -b feature/özellik-adı
   ```

### Değişikliklerin Development Branch'ine Gönderilmesi

1. **Değişiklikleri Staging Alanına Ekleyin**

   ```bash
   git add .
   ```

2. **Commit Mesajınızı Yazın**

   Commit mesajınızı anlamlı bir şekilde yazın:

   ```bash
   git commit -m "Özellik: [özellik-adı] - Değişiklik açıklaması"
   ```

3. **Güncel Development Branch’ini Alın**

   Değişikliklerinizi development branch'i ile birleştirmek için önce en son
   güncellemeleri alın:

   ```bash
   git checkout development
   git pull origin development
   ```

4. **Feature Branch’inizi Yeniden Temellendirin**

   ```bash
   git checkout feature/özellik-adı
   git rebase development
   ```

5. **Değişikliklerinizi Puslayın**

   ```bash
   git checkout development
   git merge feature/özellik-adı
   git push origin development
   ```

---

## Proje Özellikleri

- CSS klasörü altında `reset.css` ve `style.css` oluşturularak genel
  tanımlamalar yapıldı.
- `styless.css` dosyasında tanımlanan bazı değişkenler:

```css
--brend-color: #f87719;
--main-background: #111;
--main-text-color: #fff;
```

**Örnek Kullanım:**

```css
background-color: var(--brend-color);
color: var(--main-text-color);
```

- Projeye kök pixel büyüklüğü 10px olarak tanımlandı. CSS kodları için figmadan
  baktığınız pixel büyüklüğünü 10'a bölüp `rem` şeklinde yazmanız yeterlidir.

**Örnek:**

```css
font-size: 1.5rem; /* 15px için */
```

---

### **Çok Önemli:**

Projeyi hazırlarken `min-width` yaklaşımını kullanmalıyız. Kod düzeninin
sağlanması için herkesin buna dikkat etmesini rica ediyoruz. Kodlarınızı şu
sırayla yazmalısınız:

- Mobil
- Tablet
- Desktop

**Örnek:**

```css
.container {
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}

@media (min-width: 768px) {
  .container {
    width: 76.8rem;
  }
}

@media (min-width: 1280px) {
  .container {
    width: 128rem;
  }
}
```

Tablet 768px, Desktop 1280px olacak şekilde ayarlamalısınız.

**Öneri:** Mobil, tablet ve desktop için ayrı CSS dosyaları (`mobil.css`,
`tablet.css`, `desktop.css`) oluşturun. Mobil için detaylı yazdıktan sonra
sadece değişmesi gereken alanları tablet ve desktop dosyalarına ekleyin.

### Genel Buton Özellikleri

Projede kullanılacak genel buton özellikleri `styless.css` içerisine tanımlandı.
Buton tasarımları yapıldı, tekrar yapmanıza gerek yok. Butonları CSS olmadan da
ekleseniz efektleri dahil çıkacaktır.

---

### **Dosya Yapısı**

Her bölümün ayrı bir yapısı olacak. `partials` alanında mevcut sectionların
klasörleri ve dosyaları ile birlikte CSS dosyaları olacak. Genel olarak herkesin
kullanacağı özellikleri `components` içerisine koyarak farklı sayfalarda o
özelliği import edebiliriz.

---

### **Son Olarak**

Umarım güzel bir hafta geçirerek iyi bir proje ortaya çıkarırız. Projemiz şu
anda canlıya alındı:

[https://go-it-c-takimi.github.io/cinemania/](https://go-it-c-takimi.github.io/cinemania/)

Linkten ulaşabilirsiniz.
