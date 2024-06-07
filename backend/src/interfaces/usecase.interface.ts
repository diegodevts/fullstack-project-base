export interface UseCase<T> {
    handle(...[data]: T | any): Promise<T | void>
}
