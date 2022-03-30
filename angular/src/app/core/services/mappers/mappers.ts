/**
 * Mapper of DTO to domain model.
 */
interface IMapperFromDto<TDto, TModel> {

  /**
   * Maps from DTO to Domain model.
   */
  fromDto(dto: TDto): TModel;
}

/**
 * Mapper of domain model to DTO.
 */
interface IMapperToDto<TDto, TModel> {

  /**
   * Maps from Domain to DTO model.
   */
  toDto(model: TModel): TDto;
}

/**
 * Common mapper.
 */
export interface IMapper<TDto, TModel> extends IMapperFromDto<TDto, TModel>, IMapperToDto<TDto, TModel> {}
