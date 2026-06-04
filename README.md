# İsmet ile Matematik

Bu proje, `İsmet ile Matematik.html` dosyası ve ona bağlı React bileşenleriyle çalışan bir landing page prototipidir.

## İçerik

- `İsmet ile Matematik.html` — Ana sayfa, stil ve scriptleri buradan yüklüyor.
- `app.jsx` — Ana React uygulaması.
- `data.jsx` — Sayfa içeriğini sağlayan veri kaynağı.
- `sections.jsx` — Sayfa bölümlerinin React bileşenleri.
- `ui.jsx` — Yardımcı UI bileşenleri ve kart/sepete ekleme fonksiyonları.
- `tweaks-panel.jsx` — Tema kontrolleri ve ayar paneli.
- `image-slot.js` — Kullanıcı tarafından resim yerleştirilebilen özel element.

## Çalıştırma

1. Proje dizinine gidin:
   ```powershell
   cd "c:\Users\user\OneDrive\Masaüstü\YAPAY ZEKA PROJELERİM\web-sayfasi-extracted\web-sayfasi-k-sel\project"
   ```
2. Yerel sunucu başlatın:
   ```powershell
   python -m http.server 8000
   ```
3. Tarayıcıda açın:
   ```text
   http://127.0.0.1:8000/İsmet%20ile%20Matematik.html
   ```

## Durum

- Sayfa başarıyla yüklendi ve React ile render edildi.
- Konsolda hata bulunmadı.
- `image-slot.js` ve `tweaks-panel.jsx` gibi destekleyici scriptler doğru çalışıyor.

## Notlar

- Dosya adında Türkçe karakter (`İ`) bulunduğundan URL içinde doğru şekilde encode edilmelidir.
- Projeyi geliştirmek isterseniz React bileşen yapısı ve stil değişkenleri (`:root` CSS değişkenleri) üzerinden hızlıca ayar yapabilirsiniz.
