import repositories from "./mocked_values/repositories.json"

export function queryCurrentUser() {
    return {
        "name": "胡不归"
    }
}

export function queryPaperHeaders(): any[] {
    return repositories
}

export function queryExploreHeaders(): any[] {
    return queryPaperHeaders()
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