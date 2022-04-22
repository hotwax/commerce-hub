import { GetterTree } from 'vuex'
import RootState from '@/store/RootState'
import UtilState from './UtilState';

const getters: GetterTree <UtilState, RootState> = {
    getShipmentMethod: (state) => (shipmentMethodTypeId: string) => {
        return state.shipmentMethod.length && state.shipmentMethod.find((data: any) => data.shipmentMethodTypeId === shipmentMethodTypeId)?.description
    },
    getStatusDesc: (state) => (statusId: string) => {
        return state.status[statusId]
    },
    getFacilityLocations(state) {
        return state.facilityLocations.list;
    },
    isScrollable: (state) => {
        return state.facilityLocations.list?.length > 0 && state.facilityLocations.list?.length < state.facilityLocations.total
    },
    getcurrentLocationFilterSelected: (state) => {
        return state.currentLocationFilterSelected;
    }
}
export default getters;