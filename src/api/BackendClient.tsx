import repositories from "./mocked_values/repositories.json"
import materials from "./mocked_values/materials.json"

// TODO: use enum instead
export const EXPLORE_TAB = {
    PAPERS: "文章",
    MATERIALS: "素材"
}

export const LICENSES = [{text: "GPL 3.0", value: "GPL 3.0"}, {text: "CC By 4.0", value: "CC By 4.0"}]

export function queryCurrentUser() {
    return {
        "name": "胡不归"
    }
}

export function queryPaperHeaders(): any[] {
    return repositories
}

export function queryMaterialHeaders(): any[] {
    return materials
}

export function queryExploreHeaders(tab: string): any[] {
    if (tab === EXPLORE_TAB.PAPERS) {
        return queryPaperHeaders()
    } else if (tab === EXPLORE_TAB.MATERIALS) {
        return queryMaterialHeaders()
    }
    return []
}

export function queryRepository(owner: string | undefined, repoName: string | undefined) {
    for (let i = 0; i < repositories.length; i++) {
        const repo = repositories[i]
        if (repo.owner === owner && repo.repository === repoName) {
            return repo
        }
    }
    return undefined
}