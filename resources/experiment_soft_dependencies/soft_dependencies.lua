local function loadSoftDependencies(resourceName, type)
    for i = 0, GetNumResourceMetadata(resourceName, type), 1 do
        local dependencyName = GetResourceMetadata(resourceName, type, i)
        local dependencyState = GetResourceState(dependencyName)

        if dependencyState == "missing" then
            print(("Could not find soft dependency %s of resource %s").format(dependencyName, resourceName))
            goto continue
        end

        if dependencyState ~= "started" and dependencyState ~= "starting" then
            local success = StartResource(dependencyName)

            if not success then
                print(("Could not start soft dependency %s of resource %s").format(dependencyName, resourceName))
            end
        end

        ::continue::
    end
end

AddEventHandler("onResourceStarting", function(resourceName)
    loadSoftDependencies(resourceName, "soft_dependency")
    loadSoftDependencies(resourceName, "soft_dependencies")
end)
