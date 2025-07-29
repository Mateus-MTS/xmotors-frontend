import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faReddit } from '@fortawesome/free-brands-svg-icons';


function Footer() {
    return (
        <footer id="footer" className="clearfix bg-footer2 pd-t81 re-hi">
            <div className="themesflat-container">
                {/* Seção Topo */}
                <div className="row footer-top">
                    <div className="col-lg-6 col-md-12 col-12 pd-r80">
                        <h2 className="title-footer-top">
                            Você tem <span className="red-title">algo</span> para vender através de nós?
                        </h2>
                        <img
                            className="icon-ft"
                            src="/assets/images/page/mast.png"
                            alt="Ícone decorativo de rodapé"
                        />
                    </div>
                    <div className="col-lg-6 col-md-12 col-12 t-al-right pt-20">
                        <a href="#anunciar" className="btn-sell">Anuncie aqui!</a>
                    </div>
                </div>

                {/* Seção Principal */}
                <div className="row footer-main">
                    {/* Logo + Contato */}
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="widget widget-info">
                            <img src="/assets/images/logo/logo2.png" alt="Logo Footer" />
                            <p>
                                A plataforma ideal para compra, venda e serviços automotivos de forma segura, ágil e moderna.
                            </p>
                            <ul>
                                <li>
                                    <i className="icon-Vector1"></i>
                                    <p>Rua Dr. Luigi Gallichio, 140. Fátima - Caxias do Sul, RS</p>
                                </li>
                                <li>
                                    <i className="icon-Group-1"></i>
                                    <p>mateusvilarinodoprado@outlook.com</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Links Rápidos */}
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="widget widget-menu pl-60">
                            <h3>Links rápidos</h3>
                            <ul className="box-menu">
                                <li><a href="#revendedores">Vender meu veículo</a></li>
                                <li><a href="#revendedores">Revendedores</a></li>
                                <li><a href="#servicos">Serviços para empresas</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Pesquisar */}
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="widget widget-menu pl-30">
                            <h3>Pesquisar</h3>
                            <ul className="box-menu">
                                <li><a href="#newsletter">Inscreva-se para atualizações</a></li>
                                <li><a href="mailto:mateusvilarinodoprado@outlook.com">Envie-me um e-mail</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="col-lg-3 col-md-6 col-12">
                        <div className="widget widget-menu widget-form">
                            <h3>Newsletter</h3>
                            <form method="post" className="email-footer-form form-submit" action="#" acceptCharset="utf-8">
                                <div className="text-wrap clearfix">
                                    <fieldset className="email-wrap style-text">
                                        <input
                                            type="email"
                                            className="tb-my-input"
                                            name="email"
                                            placeholder="Digite o seu e-mail"
                                            required
                                            aria-required="true"
                                        />
                                    </fieldset>
                                    <button name="submit" type="submit" className="btn-submit-email" aria-label="Enviar email">
                                        <i className="icon-Group"></i>
                                        {/* <span className="sr-only">Enviar</span> */}
                                    </button>
                                </div>
                                <div className="tfad-listing-feature">
                                    <div className="radio">
                                        <input id="acceptTerms" type="checkbox" name="terms" value="accepted" />
                                        <label htmlFor="acceptTerms" className="text-white">
                                            Concordo com todos os termos e políticas
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Rodapé Inferior */}
                <div className="row footer-bottom">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                        <p className="coppy-right">© Desenvolvido por Mateus Vilarino do Prado</p>
                    </div>

                    <div className="col-12 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
                        <ul className="social-icon">
                            <li><a href="#"><i className="icon-facebook"></i></a></li>
                            {/* Font Awesome ícones dentro de <li> */}
                            <li>
                                <a href="#">
                                    <i>
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </i>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i>
                                        <FontAwesomeIcon icon={faReddit} />
                                    </i>
                                </a>
                            </li>
                            <li><a href="#"><i className="icon-linkedin"></i></a></li>
                        </ul>
                    </div>

                    <div className="col-md-12 col-lg-12 col-xl-4 col-xxl-4">
                        <ul className="bottom-bar-menu">
                            <li><a href="#politica-privacidade">Política de Privacidade</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Imagens decorativas 
                TODO:
                Ver como fica a imagem sem ficar disposta em cima de className="row footer-bottom"  */}
            {/* <img
                src="/assets/images/page/ft-left.png"
                alt="Decoração lateral esquerda"
                className="shape-left"
            /> */}
            <img
                src="/assets/images/page/ft-right.png"
                alt="Decoração lateral direita"
                className="shape-right"
            />
        </footer>
    );
}

export default Footer;
