import { TierList } from '../models/tierListModel';

class TierListService {
    private tierLists: TierList[] = [];
    private currentId: number = 1;

    createTierList(tierListData: { title: string; items: string[] }): TierList {
        const newTierList = { id: (this.currentId++).toString(), ...tierListData };
        this.tierLists.push(newTierList);
        return newTierList;
    }

    getAll(): TierList[] {
        return this.tierLists;
    }

    updateTierList(id: number, tierListData: { title?: string; items?: string[] }): TierList | null {
        const tierList = this.tierLists.find(tl => tl.id === id.toString());
        if (!tierList) return null;

        if (tierListData.title) tierList.title = tierListData.title;
        if (tierListData.items) tierList.items = tierListData.items;
        return tierList;
    }

    deleteTierList(id: number): boolean {
        const index = this.tierLists.findIndex(tl => tl.id === id.toString());
        if (index === -1) return false;

        this.tierLists.splice(index, 1);
        return true;
    }
}

export default TierListService;