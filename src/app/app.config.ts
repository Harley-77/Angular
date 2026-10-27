import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core'; //importa os recursos utilizados na configuração principal da aplicação
import { provideRouter } from '@angular/router'; //importa a função de rotas do angular.
import { routes } from './app.routes'; // impota das rotas da aplicação
import { provideHttpClient } from '@angular/common/http'; // importa o provedor de cliente HTTP do Angular

export const appConfig: ApplicationConfig = { //declara e exporta o objeto principal de confiugração da aplicação.
  providers: [ //lista de aplicações e recursos disponíveis.
    provideBrowserGlobalErrorListeners(), //configra o tratamento global de erros.
    provideRouter(routes), //disponibiliza as rotas da aplicação.
    provideHttpClient(), //disponibiliza o cliente HTTP para os serviços possa realizar requisições HTTP.
    provideZoneChangeDetection({ eventCoalescing: true }) //disponibiliza a detecção de mudanças da zona do Angular.
  ]
};
