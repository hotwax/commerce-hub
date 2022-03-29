import { GetterTree } from 'vuex'
import RootState from '@/store/RootState'
import UtilState from './UtilState';

const getters: GetterTree <UtilState, RootState> = {
    getShipmentMethod: (state) => (shipmentMethodTypeId: string) => {
        return state.shipmentMethod.find((data: any) => data.shipmentMethodTypeId === shipmentMethodTypeId)?.description
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