import { GetterTree } from 'vuex'
import RootState from '@/store/RootState'
import UtilState from './UtilState';

const getters: GetterTree <UtilState, RootState> = {
    getShipmentMethod: (state) => (shipmentMethodTypeId: string) => {
        console.log(state.shipmentMethod)
        // return state.shipmentMethod.find((data: any) => data.shipmentMethodTypeId === shipmentMethodTypeId)?.description
    },
    getFacilityName: (state) => (facilityId: any) => {
        return state.facilityList.find((facility: any) => facility.facilityId === facilityId)
        // return true;
    }
}
export default getters;