local function loadSoftDependencies(resourceName, type)
	for i = 0, GetNumResourceMetadata(resourceName, type) - 1, 1 do
        local dependencyName = GetResourceMetadata(resourceName, type, i)
        local dependencyState = GetResourceState(dependencyName)

        if dependencyState == "missing" then
			print(string.format("Could not find soft dependency %s of resource %s", dependencyName, resourceName))
            goto continue
        end

        if dependencyState ~= "started" and dependencyState ~= "starting" then
            local success = StartResource(dependencyName)

            if not success then
				print(string.format("Could not start soft dependency %s of resource %s", dependencyName, resourceName))
            end
        end

        ::continue::
    end
end

AddEventHandler("onResourceStarting", function(resourceName)
    loadSoftDependencies(resourceName, "soft_dependency")
    loadSoftDependencies(resourceName, "soft_dependencies")
end)
