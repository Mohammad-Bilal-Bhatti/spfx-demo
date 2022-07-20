import { spfi, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { IItemAddResult, PagedItemCollection } from "@pnp/sp/items";
import { ITool } from "./ITool";

export default class ToolService {

  private _sp: SPFI;
  private _listName: string = 'Tools List';

  public constructor(config: any) {
    console.log('[ToolService] constructor was called', config);
    this._sp = spfi(config)
  }

  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async insert(item: ITool): Promise<ITool> {
    console.log('[ToolService] insert was called');
    const result: IItemAddResult = await this._sp.web.lists.getByTitle(this._listName).items.add(item);
    return result.data;
  }

  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async delete(item: ITool): Promise<void> {
    console.log('[ToolService] delete was called');
    return await this._sp.web.lists.getByTitle(this._listName).items.getById(item.Id).delete(); 
  }

  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async update(item: ITool): Promise<ITool> {
    console.log('[ToolService] update was called: ', item);
    await this._sp.web.lists
      .getByTitle(this._listName)
      .items.getById(item.Id)
      .update({
        Title: item.Title,
        Description: item.Description,
      });
    return item;
  }

  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async getAll(): Promise<ITool[]> {
    console.log(`[ToolService] getAll was called`);
    const data: ITool[] = await this._sp.web.lists.getByTitle(this._listName).items();
    return data;
  }

  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async getPaginatedData(pageSize: number = 50): Promise<PagedItemCollection<ITool[]>> {
    console.log('[ToolServie] getPaginatedData was called');
    const result: PagedItemCollection<ITool[]> = await this._sp.web.lists
      .getByTitle(this._listName)
      .items
      .top(pageSize)
      .getPaged<ITool[]>();

    return result;
  }

  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async getTopOrderedBy(top: number, orderByColumn: string): Promise<ITool[]> {
    console.log('[ToolServie] getTopOrderedBy was called');
    // call this function by (top=5, orderByColumn='Modified')
    const tools: ITool[] = await this._sp.web.lists
      .getByTitle(this._listName)
      .items
      .top(top)
      .orderBy(orderByColumn, true)();
    return tools;
  }

  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async getById(id: number): Promise<ITool> {
    console.log(`[ToolService] getById was called`);
    const data: ITool = await this._sp.web.lists.getByTitle(this._listName).items.getById(id)();
    return data;
  }

}
