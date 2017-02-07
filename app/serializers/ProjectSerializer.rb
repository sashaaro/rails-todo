class ProjectSerializer < ActiveModel::Serializer
    #attributes(:name)

    #has_one :hand
	has_many :todos
    #url :body
end