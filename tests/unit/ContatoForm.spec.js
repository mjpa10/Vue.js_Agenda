import { mount } from '@vue/test-utils';
import ContatoForm from '@/components/ContatoForm.vue';

describe('ContatoForm', () => {
  let wrapper;

  beforeEach(() => {
    // Definindo o mock de fetch globalmente antes de montar o componente
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ nome: 'João' }),
      })
    );

    wrapper = mount(ContatoForm);
  });

  it('deve renderizar o componente corretamente', () => {
    expect(wrapper.exists()).toBe(true); //verifica se o componente foi montado e renderizado com sucesso.
  });

  it('deve ter um formulário com inputs para nome, email e telefone', () => { //verificando quando ha informacoes no input
    const nomeInput = wrapper.find('input#nome');
    const emailInput = wrapper.find('input#email');
    const telefoneInput = wrapper.find('input#telefone');

    expect(nomeInput.exists()).toBe(true);
    expect(emailInput.exists()).toBe(true);
    expect(telefoneInput.exists()).toBe(true);
  });

  it('deve exibir a mensagem de sucesso após criar o contato', async () => {
    await wrapper.setData({ Nome: 'João', Email: 'joao@example.com', Telefone: '123456789' }); //simulacao do data
    await wrapper.find('form').trigger('submit.prevent'); //simulacao do clicar do botao e e dando submit no form

    expect(wrapper.findComponent({ name: 'Message' }).text()).toContain('Contato João adicionado com Sucesso'); // recebendo a mensagem
  });

  it('deve exibir a mensagem de erro se a criação do contato falhar', async () => {
    global.fetch.mockImplementationOnce(() => //simula uma requisicao errada
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({
          errors: {
            Nome: 'Nome é obrigatório',
            Email: 'Email é obrigatório',
            Telefone: 'Telefone é obrigatório',
          },
        }),
      })
    );

    await wrapper.setData({ Nome: '', Email: '', Telefone: '' });
    await wrapper.find('form').trigger('submit.prevent'); //simulla envio do formulario

    expect(wrapper.findComponent({ name: 'Message' }).text()).toContain('Erros: Nome é obrigatório Email é obrigatório Telefone é obrigatório'); // espera essa resposta
  });

  afterEach(() => { // apos o teste, o mock sera excluido para n afetar em outro teste
    if (global.fetch) {
      global.fetch.mockClear();
      delete global.fetch;
    }
  });
});
