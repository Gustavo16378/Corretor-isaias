export type ImovelTipo = 'residencial' | 'alto-padrao' | 'lancamento'
export type ImovelTag = 'Novo' | 'Exclusivo' | 'Lançamento'
export type FiltroTipo = 'todos' | ImovelTipo

export interface Imovel {
  id: string
  titulo: string
  tipo: ImovelTipo
  preco: string
  localizacao: string
  area: string
  quartos: number
  banheiros: number
  vagas: number
  fotos: string[]
  destaque: boolean
  tag?: ImovelTag
  descricao: string
}

export interface FormContato {
  nome: string
  telefone: string
  email: string
  tipoImovel: string
  mensagem: string
  website: string
}
