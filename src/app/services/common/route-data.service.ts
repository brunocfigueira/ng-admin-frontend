import {Injectable} from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteDataService {
  private titleSubject = new BehaviorSubject<string>('');
  private subtitleSubject = new BehaviorSubject<string>('');
  private layoutSubject = new BehaviorSubject<string>('compacted');
  private dataSubject = new BehaviorSubject<Record<string, any>>({});

  title$ = this.titleSubject.asObservable();
  subtitle$ = this.subtitleSubject.asObservable();
  layout$ = this.layoutSubject.asObservable();
  data$ = this.dataSubject.asObservable();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    // Escutar eventos de navegação para atualizar os dados da rota
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getChildRoute(this.activatedRoute)),
        map((route) => route.snapshot.data)
      )
      .subscribe((data) => {
        this.updateData(data);
      });
  }

  private getChildRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }

  /**
   * Atualiza os dados da rota nos BehaviorSubjects
   * @param data Objeto contendo os dados da rota
   */
  private updateData(data: Record<string, any>): void {
    // Atualiza campos predefinidos
    this.titleSubject.next(data['title']?.trim() || '');
    this.subtitleSubject.next(data['subtitle']?.trim() || '');
    this.layoutSubject.next(data['layout']?.trim().toLowerCase() || 'compacted');

    // Atualiza o objeto completo em data$
    this.dataSubject.next(data);
  }

  /**
   * Recupera dinamicamente o valor de uma chave específica no objeto de dados da rota
   * @param key Nome da chave
   * @returns O valor correspondente ou undefined se não encontrado
   */
  getValue(key: string): any {
    const currentData = this.dataSubject.getValue();
    return currentData[key];
  }
}
