// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {IBlock} from '../blocks/block'
import {FilterGroup} from '../filterGroup'

import {MutableBlock} from './block'

type IViewType = 'board' | 'table' // | 'calendar' | 'list' | 'gallery'
type ISortOption = { propertyId: '__title' | string, reversed: boolean }

interface BoardView extends IBlock {
    readonly viewType: IViewType
    readonly groupById: string
    readonly sortOptions: readonly ISortOption[]
    readonly visiblePropertyIds: readonly string[]
    readonly visibleOptionIds: readonly string[]
    readonly hiddenOptionIds: readonly string[]
    readonly filter: FilterGroup | undefined
    readonly cardOrder: readonly string[]
    readonly columnWidths: Readonly<Record<string, number>>
}

class MutableBoardView extends MutableBlock {
    get viewType(): IViewType {
        return this.fields.viewType
    }
    set viewType(value: IViewType) {
        this.fields.viewType = value
    }

    get groupById(): string | undefined {
        return this.fields.groupById
    }
    set groupById(value: string | undefined) {
        this.fields.groupById = value
    }

    get sortOptions(): ISortOption[] {
        return this.fields.sortOptions
    }
    set sortOptions(value: ISortOption[]) {
        this.fields.sortOptions = value
    }

    get visiblePropertyIds(): string[] {
        return this.fields.visiblePropertyIds
    }
    set visiblePropertyIds(value: string[]) {
        this.fields.visiblePropertyIds = value
    }

    get visibleOptionIds(): string[] {
        return this.fields.visibleOptionIds
    }
    set visibleOptionIds(value: string[]) {
        this.fields.visibleOptionIds = value
    }

    get hiddenOptionIds(): string[] {
        return this.fields.hiddenOptionIds
    }
    set hiddenOptionIds(value: string[]) {
        this.fields.hiddenOptionIds = value
    }

    get filter(): FilterGroup | undefined {
        return this.fields.filter
    }
    set filter(value: FilterGroup | undefined) {
        this.fields.filter = value
    }

    get cardOrder(): string[] {
        return this.fields.cardOrder
    }
    set cardOrder(value: string[]) {
        this.fields.cardOrder = value
    }

    get columnWidths(): Record<string, number> {
        return this.fields.columnWidths as Record<string, number>
    }
    set columnWidths(value: Record<string, number>) {
        this.fields.columnWidths = value
    }

    constructor(block: any = {}) {
        super(block)

        this.type = 'view'

        this.sortOptions = block.fields?.sortOptions?.map((o: ISortOption) => ({...o})) || []		// Deep clone
        this.visiblePropertyIds = block.fields?.visiblePropertyIds?.slice() || []
        this.visibleOptionIds = block.fields?.visibleOptionIds?.slice() || []
        this.hiddenOptionIds = block.fields?.hiddenOptionIds?.slice() || []
        this.filter = new FilterGroup(block.fields?.filter)
        this.cardOrder = block.fields?.cardOrder?.slice() || []
        this.columnWidths = {...(block.fields?.columnWidths || {})}

        if (!this.viewType) {
            this.viewType = 'board'
        }
    }
}

export {BoardView, MutableBoardView, IViewType, ISortOption}
