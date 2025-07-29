import { useState, useEffect } from 'react';
import './_index.scss';
import Header from './common/Header/Header';
import Slide from './Slide/Carousel/Carousel.jsx';
import Filter from './Filter/FilterPanel/FilterPanel.jsx';
import ListingView from './Listing/Listing.jsx';
import Footer from './Footer/Footer.jsx';
import Preloader from './common/PreLoader/PreLoader.jsx';

function App() {
  const [showPreloader, setShowPreloader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPreloader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Dados do menu (pode ser movido para um arquivo separado)
  const menuItems = [
    {
      title: "Veículos",
      submenu: [
        { text: "Listagem", href: "car-list.html" },
        { text: "Listagem Detalhes", href: "listing-details.html" }
      ]
    },
    {
      title: "Página",
      submenu: [
        { text: "Dashboard", href: "dashboard.html" },
        { text: "Meu Inventário", href: "my-inventory.html" },
        { text: "Adicionar Veículo", href: "addcart.html" },
        { text: "Perfil do Vendedor", href: "seller-profile.html" },
        { text: "Detalhes do Revendedor", href: "dealer-details.html" },
        { text: "404", href: "404.html" }
      ]
    },
    {
      title: "Notícias",
      submenu: [
        { text: "Lista de Blogs", href: "blog.html" },
        { text: "Detalhes do Blog", href: "blog-single.html" }
      ]
    },
    {
      title: "Contate-nos",
      href: "contact-us.html"
    }
  ];

  return (
    <>
      {showPreloader && <Preloader />}
      
      <Header menuItems={menuItems} />
      
      <main>
        <Slide />
        <Filter />
        <ListingView />
      </main>

      <Footer />
    </>
  );
}

export default App;