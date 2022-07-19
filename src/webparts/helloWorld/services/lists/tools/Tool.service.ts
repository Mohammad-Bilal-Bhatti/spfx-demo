import { spfi, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { ITool } from "./ITool";

export default class ToolService {

  private _sp: SPFI;
  private _listName: string = 'Tools List';

  public constructor(config: any) {
    console.log('[ToolService] constructor was called', config);
    this._sp = spfi(config)
  }


  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async getAll(): Promise<ITool[]> {
    console.log(`[ToolService] getAll was called`);
    const data: ITool[] = await this._sp.web.lists.getByTitle(this._listName).items();
    return data;
  }

  // eslint-disable-next-line @microsoft/spfx/no-async-await
  public async getById(id: number): Promise<ITool> {
    console.log(`[ToolService] getById was called`);
    const data: ITool = await this._sp.web.lists.getByTitle(this._listName).items.getById(id)();
    return data;
  }

}
