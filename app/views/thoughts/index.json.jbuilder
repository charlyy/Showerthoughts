json.array!(@thoughts) do |thought|
  json.extract! thought, :id
  json.url thought_url(thought, format: :json)
end
