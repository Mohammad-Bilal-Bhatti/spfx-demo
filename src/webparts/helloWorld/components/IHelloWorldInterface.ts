import { ITool } from "../services/lists/tools/ITool";

export interface IHelloWorldProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}

export interface IHelloWorldState {
  loading: boolean,
  data: ITool[],
  error: Error;
  hasNext: boolean,
  selected: {
    item: ITool,
    index: number,
  };
}