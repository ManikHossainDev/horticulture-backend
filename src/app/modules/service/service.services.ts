import { PaginateOptions, PaginateResult } from '../../../types/paginate';
import { IService } from './service.interface';
import Service from './service.model';

const addService = async (
  serviceData: Partial<IService>
): Promise<IService> => {
  const newService = await Service.create(serviceData);
  return newService;
};

const getAllServices = async (
  filters: Partial<IService>,
  options: PaginateOptions
): Promise<PaginateResult<IService>> => {
  const sanitizedFilters = {
    ...filters,
    isDeleted: false,
  };
  const services = await Service.paginate(sanitizedFilters, options);
  return services;
};

const getSingleService = async (id: string): Promise<IService> => {
  const service = await Service.findOne({_id:id, isDeleted: false});
  if (!service) {
    throw new Error('Service not found');
  }
  return service;
};

const updateService = async (
  id: string,
  payload: Partial<IService>
): Promise<IService> => {
  const service = await Service.findById(id);
  if (!service) {
    throw new Error('Service not found');
  }
  Object.assign(service, payload);
  await service.save();
  return service;
};

const deleteService = async (id: string): Promise<IService> => {
  const service = await Service.findById(id);
  if (!service) {
    throw new Error('Service not found');
  }
  service.isDeleted = true;
  await service.save();
  return service;
};

export const ServiceService = {
  addService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
