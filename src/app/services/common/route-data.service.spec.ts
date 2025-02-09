import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { RouteDataService } from './route-data.service';
import { filter, map } from 'rxjs/operators';

describe('RouteDataService', () => {
  let service: RouteDataService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  const mockRouter = {
    events: new BehaviorSubject<any>(null),
    navigate: jasmine.createSpy('navigate')
  };

  const mockActivatedRoute = {
    snapshot: {
      data: {}
    },
    firstChild: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouteDataService,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    });

    service = TestBed.inject(RouteDataService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('updateData', () => {
    it('should update title, subtitle, layout, and data$ when updateData is called', () => {
      const mockData: Data = {
        title: 'Test Title',
        subtitle: 'Test Subtitle',
        layout: 'expanded',
        customKey: 'customValue'
      };

      // Simula a atualização dos dados da rota
      service['updateData'](mockData);

      // Verifica se os BehaviorSubjects foram atualizados corretamente
      expect(service.title$.subscribe((title) => expect(title).toBe('Test Title')));
      expect(service.subtitle$.subscribe((subtitle) => expect(subtitle).toBe('Test Subtitle')));
      expect(service.layout$.subscribe((layout) => expect(layout).toBe('expanded')));
      expect(service.data$.subscribe((data) => expect(data).toEqual(mockData)));
    });

    it('should use default values if data fields are missing', () => {
      const mockData: Data = {};

      // Simula a atualização dos dados da rota
      service['updateData'](mockData);

      // Verifica se os valores padrão foram aplicados
      expect(service.title$.subscribe((title) => expect(title).toBe('')));
      expect(service.subtitle$.subscribe((subtitle) => expect(subtitle).toBe('')));
      expect(service.layout$.subscribe((layout) => expect(layout).toBe('compacted')));
      expect(service.data$.subscribe((data) => expect(data).toEqual({})));
    });
  });

  describe('getValue', () => {
    it('should return the value of a specific key from data$', () => {
      const mockData: Data = {
        customKey: 'customValue'
      };

      // Simula a atualização dos dados da rota
      service['updateData'](mockData);

      // Verifica se o valor da chave é retornado corretamente
      const value = service.getValue('customKey');
      expect(value).toBe('customValue');
    });

    it('should return undefined if the key does not exist in data$', () => {
      const mockData: Data = {};

      // Simula a atualização dos dados da rota
      service['updateData'](mockData);

      // Verifica se undefined é retornado para uma chave inexistente
      const value = service.getValue('nonExistentKey');
      expect(value).toBeUndefined();
    });
  });

  describe('router events', () => {
    it('should not update data for non-NavigationEnd events', () => {
      const mockData: Data = {
        title: 'New Title',
        subtitle: 'New Subtitle',
        layout: 'expanded'
      };

      // Configura o ActivatedRoute para retornar dados simulados
      mockActivatedRoute.snapshot.data = mockData;

      // Emite um evento que não é NavigationEnd
      mockRouter.events.next({ type: 'OtherEvent' });

      // Verifica se os dados não foram atualizados
      expect(service.title$.subscribe((title) => expect(title).toBe('')));
      expect(service.subtitle$.subscribe((subtitle) => expect(subtitle).toBe('')));
      expect(service.layout$.subscribe((layout) => expect(layout).toBe('compacted')));
      expect(service.data$.subscribe((data) => expect(data).toEqual({})));
    });
  });
});
