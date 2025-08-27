export interface ContentProvider {
    async byId(id: string): Promise<object>
    async entries(): Promise<string[]>
}

export class AssetsContentProvider implements ContentProvider {
     async byId(id: string): Promise<object> {
        return (await import(`$lib/assets/content/${id}.json`)).default;
    }

    async entries(): Promise<string[]> {
        return import('$lib/assets/content')
                .then((it) => Object.entries(it).map((that) => that[0]));
    }
}

export default new AssetsContentProvider();
