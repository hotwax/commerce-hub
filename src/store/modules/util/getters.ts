import { GetterTree } from 'vuex'
import RootState from '@/store/RootState'
import UtilState from './UtilState';

const getters: GetterTree <UtilState, RootState> = {
    getShipmentMethod: (state) => (shipmentMethodTypeId: string) => {
        return state.shipmentMethod.find((data: any) => data.shipmentMethodTypeId === shipmentMethodTypeId)?.description
    },
    getFacilityLocations(state) {
        return state.facilityLocations;
    }
}
export default getters;